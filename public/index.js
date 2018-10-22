$(document).ready(function () {
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
    const numOfOptions = $("#select-vote").children("option").length - 2;
    if (selectVal === "new") {
      $("#add-option").removeAttr("hidden");
      if (numOfOptions > 9) {
        $("#add-option").attr("disabled", "disabled")
      } else {
        $("#add-option").removeAttr("disabled");
      }
    } else {
      $("#add-option").attr("hidden", "true");
    }
  });
});
