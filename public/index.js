$(document).ready(function() {
  $(".btn-more").on("click", event => {
    event.preventDefault();
    let n = $(".options").length;
    if (n <= 9) {
      $(".input-options").append(
        '<br><input type="text" class="form-control options" name="options" placeholder="Another Colour" autocomplete="off"></input>'
      );
    }
  });

  $("#select-vote").on("change", e => {
    const selectVal = $("#select-vote")
      .find(":selected")
      .val();
    if (selectVal === "new") {
      $("#add-option").removeAttr("hidden");
    } else {
      $("#add-option").attr("hidden", "true");
    }
  });
});
