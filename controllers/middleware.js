exports.isLoggedIn = (req, res) => {
  if (req.isAuthenticated()) {
    return true;
  }
  return false;
}