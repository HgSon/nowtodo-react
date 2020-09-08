import proxy from "http-proxy-middleware";
export default (app) => {
  app.use(
    proxy("/api", {
      target: "http://localhost:3001/",
    })
  );
};
