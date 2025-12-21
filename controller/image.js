// openai service or gemini service for generating image
// api key

exports.generateImage = async (req, res) => {
  try {
    console.log(
      `Started processing of image generation request for user id ${req.user.id}`
    );
    // use some service to generate image based on prompt => image

    // handle image format

    // cloudinary for image upload => url

    // save prompt and other details along with url => for keep history

    // return the result
  } catch (error) {
    console.error(`Error in generating image. Error is ${error.message}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
