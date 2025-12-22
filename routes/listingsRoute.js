const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLogin, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
// index
router.route("/").get(wrapAsync(listingController.index)).post(
  isLogin,
  upload.single("listing[image]"),
  validateListing,

  wrapAsync(listingController.createListings)
);

// create new;

router.get("/new", isLogin, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.renderShowForm))
  .put(
    isLogin,
    isOwner,
    upload.single("listing[image]"),
    validateListing,

    wrapAsync(listingController.renderEditForm)
  )
  .delete(isLogin, isOwner, wrapAsync(listingController.deleteForm));

router.get(
  "/:id/edit",
  isLogin,
  isOwner,
  wrapAsync(listingController.editListingForm)
);

module.exports = router;
