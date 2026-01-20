import { useEffect } from "react";
import { getBlogs } from "@/api/blogs";

function App() {
  useEffect(() => {
    getBlogs().then(console.log);
  }, []);

  return <div className="p-6">Check console</div>;
}

export default App;
