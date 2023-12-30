exports.main_page = (req, res, next) => {
  const username = req.username;
  console.log(username);

  res.render("index", {
    title: "ElementalistsBattle",
    userName: username,
  });
};
//przekazujemy dane do widoku
