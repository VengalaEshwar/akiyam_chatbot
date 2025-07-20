import React, { useState, useRef } from "react";
import "./VideoGenerator.css"; // We'll create this CSS file

function VideoGenerator({ isDark }) {


const [formData, setFormData] = useState({
  user_query: '',
  product_image: null,
  logo_image: null,
  other_product_image: null,
  category: '',
  product_details: {
    name: '',
    category: '',
    target_audience: '',
    key_features: [],
    price_range: '',
    brand: ''
  }
});

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value });
};

const handleNestedChange = (e) => {
  setFormData({
    ...formData,
    product_details: {
      ...formData.product_details,
      [e.target.name]: e.target.value
    }
  });
};

const handleFeaturesChange = (e) => {
  setFormData({
    ...formData,
    product_details: {
      ...formData.product_details,
      key_features: e.target.value.split(',').map(f => f.trim())
    }
  });
};

const handleFileChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.files[0] });
};

const handleCategoryChange = (e) => {
  setFormData({ ...formData, category: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const submission = new FormData();
  submission.append("user_query", formData.user_query);
  submission.append("category", formData.category);
  submission.append("product_image", formData.product_image);
  submission.append("logo_image", formData.logo_image);
  submission.append("other_product_image", formData.other_product_image);
  submission.append("product_details", JSON.stringify(formData.product_details));

  const response = await fetch("/api/upload", {
    method: "POST",
    body: submission,
  });

  const result = await response.json();
  console.log("Server Response:", result);
};


  // Accept isDark as a prop
  const [activeTab, setActiveTab] = useState("textToVideo"); // 'textToVideo' or 'imageToVideo'
  const [prompt, setPrompt] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [generatedVideo, setGeneratedVideo] = useState(null);
  const [videoDuration, setVideoDuration] = useState("6s");
  const [resolution, setResolution] = useState("768p");

  const imageInputRef = useRef(null);

  const handleGenerateVideo = () => {
    // In a real application, you'd send 'prompt' or 'selectedImage'
    // along with 'videoDuration' and 'resolution' to a backend API
    // that generates the video. For this example, we'll simulate it.

    // Simulate video generation
    console.log("Generating video...");
    console.log("Active Tab:", activeTab);
    if (activeTab === "textToVideo") {
      console.log("Prompt:", prompt);
    } else {
      console.log("Image:", selectedImage ? selectedImage.name : "No image");
    }
    console.log("Duration:", videoDuration);
    console.log("Resolution:", resolution);

    // Simulate a generated video URL
    setGeneratedVideo("https://www.w3schools.com/html/mov_bbb.mp4"); // Example video URL
  };

  const handleImageUploadClick = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
      setGeneratedVideo(null); // Clear previous video when a new image is selected
    }
  };

  // Determine the theme class based on the isDark prop
  const themeClass = isDark ? "dark-theme" : "light-theme";

  return (
    <div className={`video-generator-container ${themeClass}`}>
      {/* Removed theme toggle, as theme is controlled by parent via isDark prop */}
      <div className="content-wrapper ">
        <div className="input-section">
          <div className="tab-buttons">
            <button
              className={`tab-button ${
                activeTab === "textToVideo" ? "active" : ""
              }`}
              onClick={() => {
                setActiveTab("textToVideo");
                setSelectedImage(null); // Clear image when switching to text
                setGeneratedVideo(null); // Clear video
              }}
            >
              Text to Video
            </button>
            <button
              className={`tab-button ${
                activeTab === "imageToVideo" ? "active" : ""
              }`}
              onClick={() => {
                setActiveTab("imageToVideo");
                setPrompt(""); // Clear prompt when switching to image
                setGeneratedVideo(null); // Clear video
              }}
            >
              Image to Video
            </button>
          </div>

          <div className="input-area">
            {activeTab === "textToVideo" ? (
              <>
                <label htmlFor="prompt-input">
                  Describe the video you want to create...
                </label>
                <textarea
                  id="prompt-input"
                  placeholder="Enter your prompt here..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows="4"
                  className="text-area-of-video"
                ></textarea>
                <div className="inspiration-tags">
                  <span>Inspiration:</span>
                  <span className="tag">Dream</span>
                  <span className="tag">Spaceship</span>
                  <span className="tag">Neon light</span>
                </div>
              </>
            ) : (
              <>
                <form className="input-section" onSubmit={handleSubmit}>
                  <div className="input-area-container">
                    <label htmlFor="user_query">User Query</label>
                    <textarea
                      id="user_query"
                      className="text-area-of-video"
                      value={formData.user_query}
                      onChange={handleChange}
                      placeholder="Enter product description..."
                      required
                    />
                  </div>

                  <div className="input-area-container">
                    <label htmlFor="product_image">Product Image</label>
                    <input
                      type="file"
                      id="product_image"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="input-area-container">
                    <label htmlFor="logo_image">Logo Image</label>
                    <input
                      type="file"
                      id="logo_image"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="input-area-container">
                    <label htmlFor="other_product_image">
                      Other Product Image
                    </label>
                    <input
                      type="file"
                      id="other_product_image"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="input-area-container">
                    <label htmlFor="name">Product Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.product_details.name}
                      onChange={handleNestedChange}
                    />
                  </div>

                  <div className="input-area-container">
                    <label htmlFor="target_audience">Target Audience</label>
                    <input
                      type="text"
                      id="target_audience"
                      name="target_audience"
                      value={formData.product_details.target_audience}
                      onChange={handleNestedChange}
                    />
                  </div>

                  <div className="input-area-container">
                    <label htmlFor="key_features">
                      Key Features (comma-separated)
                    </label>
                    <input
                      type="text"
                      id="key_features"
                      name="key_features"
                      value={formData.product_details.key_features.join(", ")}
                      onChange={handleFeaturesChange}
                    />
                  </div>

                  <div className="input-area-container">
                    <label htmlFor="price_range">Price Range</label>
                    <input
                      type="text"
                      id="price_range"
                      name="price_range"
                      value={formData.product_details.price_range}
                      onChange={handleNestedChange}
                    />
                  </div>

                  <div className="input-area-container">
                    <label htmlFor="brand">Brand</label>
                    <input
                      type="text"
                      id="brand"
                      name="brand"
                      value={formData.product_details.brand}
                      onChange={handleNestedChange}
                    />
                  </div>

                  <div className="input-area-container">
                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={handleCategoryChange}
                    >
                      <option value="">Select a category</option>
                      {[
                        "Education",
                        "Advertisement",
                        "Healthcare & Wellness",
                        "Advertisement & Marketing",
                        "Entertainment",
                        "Vlogs",
                        "Comedy",
                        "Music",
                        "Gaming",
                        "Livestreams",
                        "News & Commentary",
                        "Technology",
                        "Science",
                        "DIY & Crafts",
                        "Lifestyle",
                        "Fashion & Beauty",
                        "Food & Cooking",
                        "Travel",
                        "Business & Finance",
                        "Sports",
                        "Documentaries",
                        "Animation",
                        "Product Reviews & Unboxing",
                        "Tutorials & How-To's",
                        "Social & Advocacy",
                      ].map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button className="generate-button" type="submit"> Submit
                  </button>
                </form>
              </>
            )}
          </div>

          <div className="options-section ">
            <div className="option-group">
              <label>Video Duration:</label>
              <div className="radio-group">
                {["6s", "10s", "15s"].map((duration) => (
                  <label key={duration}>
                    <input
                      type="radio"
                      name="duration"
                      value={duration}
                      checked={videoDuration === duration}
                      onChange={(e) => setVideoDuration(e.target.value)}
                    />
                    {duration}
                  </label>
                ))}
              </div>
            </div>

            <div className="option-group">
              <label>Resolution:</label>
              <div className="radio-group">
                {["768p", "1080p"].map((res) => (
                  <label key={res}>
                    <input
                      type="radio"
                      name="resolution"
                      value={res}
                      checked={resolution === res}
                      onChange={(e) => setResolution(e.target.value)}
                    />
                    {res}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button className="generate-button" onClick={handleGenerateVideo}>
            Generate Video
            {/* <span className="credits">10 credits</span> */}
          </button>
        </div>

        <div className="video-display-section">
          {generatedVideo ? (
            <video controls src={generatedVideo} className="generated-video">
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="placeholder-video">
              <p>AI Video Generation Demo</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoGenerator;
