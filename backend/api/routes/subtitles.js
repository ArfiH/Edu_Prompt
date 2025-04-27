import express from "express";
import axios from "axios";
import protobuf from "protobufjs";
import { Buffer } from "buffer";

const router = express.Router();

/* Helper Functions */
function getBase64Protobuf(message) {
  const root = protobuf.Root.fromJSON({
    nested: {
      Message: {
        fields: {
          param1: { id: 1, type: "string" },
          param2: { id: 2, type: "string" },
        },
      },
    },
  });

  const MessageType = root.lookupType("Message");
  const buffer = MessageType.encode(message).finish();
  return Buffer.from(buffer).toString("base64");
}

function extractText(item) {
  return item.simpleText || item.runs?.map((run) => run.text).join("");
}

async function getSubtitles(videoId, language = "en", trackKind = "asr") {
  const message = {
    param1: videoId,
    param2: getBase64Protobuf({
      param1: trackKind === "asr" ? trackKind : null,
      param2: language,
    }),
  };

  const params = getBase64Protobuf(message);

  const url = "https://www.youtube.com/youtubei/v1/get_transcript";
  const headers = { "Content-Type": "application/json" };
  const data = {
    context: {
      client: {
        clientName: "WEB",
        clientVersion: "2.20240826.01.00",
      },
    },
    params,
  };

  const response = await axios.post(url, data, { headers });

  const initialSegments =
    response.data.actions[0].updateEngagementPanelAction.content
      .transcriptRenderer.content.transcriptSearchPanelRenderer.body
      .transcriptSegmentListRenderer.initialSegments;

  if (!initialSegments) {
    throw new Error(`Transcript does not exist for video: ${videoId}`);
  }

  let subtitles = "";
  initialSegments.forEach((segment) => {
    const line =
      segment.transcriptSectionHeaderRenderer ||
      segment.transcriptSegmentRenderer;
    const { snippet } = line;
    subtitles += extractText(snippet) + ". ";
  });

  return subtitles;
}

/* Route */
router.get("/:videoId", async (req, res) => {
  const { videoId } = req.params;

  try {
    const subtitles = await getSubtitles(videoId, "en", "asr");
    res.json({ subtitles });
  } catch (error) {
    console.log("❌ Error fetching subtitles:", error.message);
    console.log("⚠️ ASR subtitles not available, trying standard...");
    try {
      // Try standard (uploaded)
      return await getSubtitles(videoId, "en", "standard");
    } catch (stdError) {
      console.log("No subtitles available for this video.");
    }
  }
});

export default router;
