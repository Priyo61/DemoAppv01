maptilersdk.config.apiKey = mapApi;

const map = new maptilersdk.Map({
  container: "map", // The ID of your <div>
  style: maptilersdk.MapStyle.STREETS, // Professional modern style
  center: [93.9386, 24.8108], // [lng, lat] - Bangalore
  zoom: 12,
});
