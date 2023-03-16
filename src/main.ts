import server from "./server";

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server running on http://127.0.0.1:${port}`);
});
