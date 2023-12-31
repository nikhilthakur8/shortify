const express = require("express");
const url = require("../models/url");
const staticRouter = express.Router();
const {
  handleGenerateNewShortURL,
  handleURL,
  handleUrlAnalytics,
  handleGetUrl,
} = require("../controllers/url");


const { restrictTo } = require("../middleware/auth");
staticRouter.route("/:id").get(handleURL);

staticRouter.get("/admin/url", restrictTo(["ADMIN"]), async (req, res) => {
  const allURL = await url.find({}).sort({ createdAt: -1 });
  return res.render("url.pug", { allURL, user: req.user });
});
staticRouter
  .route("/")
  .get(restrictTo(["NORMAL", "ADMIN"]), handleGetUrl)
  .post(handleGenerateNewShortURL);
staticRouter.get("/app/about",(req,res)=>{
  res.render("about-us.pug");
})

module.exports = staticRouter;
