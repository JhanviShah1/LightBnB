$(() => {
  const $newReviewForm = $(`
    <form>
      <textarea id="new-review-body" rows="4 cols="50"></textarea>
      <label for="new-review-rating">Select a rating:</label>
      <select name="rating" id="new-review-rating">
        <option value="">-- Select a rating --</option>
        <option value="1">1 star</option>
        <option value="2">2 stars</option>
        <option value="3">3 stars</option>
        <option value="4">4 stars</option>
        <option value="5">5 stars</option>
      </select>
      <div id="datatag" class="hidden"></div>
      <button type="submit">Submit</button>
    </form>
  `);
  $newReviewForm.on("submit", function (event) {
    event.preventDefault();
    const reviewBody = $("#new-review-body").val();
    const reviewRating = $("#new-review-rating").val();
    const reservationId = $("#datatag h4").text();
    // clear our review fields
    $("#new-review-rating").val("");
    $("#new-review-body").val("");
    if (reviewRating && reservationId) {
      getIndividualReservation(reservationId).then((data) => {
        const dataObj = {
          ...data,
          reservationId: data.id,
          message: reviewBody,
          rating: reviewRating,
        };
        submitReview(dataObj).then((result) => {
          views_manager.show("listings");
        });
      });
    }
  });

  window.$newReviewForm = $newReviewForm;
});
