import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

const Home = async () => {
  const result = await db.select().from(users);
  
  console.log(JSON.stringify(result, null, 2));

  return (
    <div>User Home</div>
  );
};

export default Home;