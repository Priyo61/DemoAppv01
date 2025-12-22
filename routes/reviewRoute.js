const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { validateReview, isLogin, isReviewAuthor } = require("../middleware");
const reviewController = require("../controllers/review");

router.post(
  "/",
  isLogin,
  validateReview,
  wrapAsync(reviewController.reviewRender)
);

router.delete(
  "/:reviewId",
  isLogin,
  isReviewAuthor,
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;
