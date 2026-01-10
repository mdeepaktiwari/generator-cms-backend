const { GoogleGenAI } = require("@google/genai");
const mongoose = require("mongoose");
require("dotenv").config();
const Content = require("../models/content");
const { ACTIONS } = require("../constant");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

exports.generateContent = async (req, res) => {
  try {
    console.log(
      `Started processing of content generation request for user id ${req.user.id} and action is ${req.params.action}`
    );
    const { content } = req.body;
    const action = req.params.action;

    if (!content) {
      return res.status(400).json({
        message: "Content is required",
      });
    }

    const actionObj = ACTIONS[action];

    if (!actionObj) {
      return res.status(400).json({
        message: "Invalid action",
      });
    }

    const prompt = ` 
      ${actionObj.prompt}
      Content: ${content}
    `;

    const updated_content = await generateContentWithGemini(prompt);

    await Content.create({
      user_id: req.user.id,
      input_prompt: content,
      output_content: updated_content,
      type: action,
    });

    return res.status(200).json({
      message: actionObj.message,
      content: updated_content,
    });
  } catch (error) {
    console.error(`Error in generating content. Error is ${error.message}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

async function generateContentWithGemini(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text;
}

exports.history = async (req, res) => {
  try {
    console.log(
      `Started processing content history request for user ${req.user.id}`
    );
    const id = req.user.id;
    const content = await Content.aggregate([
      {
        $match: { user_id: new mongoose.Types.ObjectId(id) },
      },
      {
        $project: {
          _id: 1,
          type: 1,
          createdAt: 1,
          prompt: "$input_prompt",
          content: "$output_content",
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    return res.status(200).json({
      message: "Content fetched successfully",
      content,
    });
  } catch (error) {
    console.error(
      `Error in fetching content history. Error is ${error.message}`
    );
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.contentWithId = async (req, res) => {
  try {
    console.log(
      `Started processing content with id request for user ${req.user.id} and content id ${req.params.id}`
    );
    const { id: contentId } = req.params;

    if (!contentId) {
      return res.status(400).status({
        message: "Content id is required",
      });
    }

    const content = await Content.findById(contentId);

    if (!content) {
      return res.status(200).json({
        message: "No content found",
      });
    }

    if (content.user_id.toString() !== req.user.id) {
      return res.status(400).json({
        message: "Unauthorized access",
      });
    }

    return res.status(200).json({
      message: "Content fetched successfully",
      content: {
        output: content.output_content,
        createdAt: content.createdAt,
        type: content.type,
        input: content.input_prompt,
      },
    });
  } catch (error) {
    console.error(
      `Error in fetching content details. Error is ${error.message}`
    );
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
