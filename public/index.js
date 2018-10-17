$(document).ready(function() {
  $(".btn-more").on("click", () => {
    $(".input-options").append(
      '<br><input type="text" class="form-control options" placeholder="Another Colour"></input>'
    );
  });
});
