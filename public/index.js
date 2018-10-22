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
    const numOfOptions = $("#select-vote").children("option").length;
    if (selectVal === "new") {
      $("#add-option").removeAttr("hidden");
      numOfOptions >= 10 ? $("#add-option").prop("disabled", "true") : $("#add-option").prop("disabled", "false");
    } else {
      $("#add-option").attr("hidden", "true");
    }
  });
});
