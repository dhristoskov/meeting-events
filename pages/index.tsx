import { DateComparer } from "@/components/utils/dateComparer";

const Home = () =>  {

  const date = DateComparer(new Date('2021-03-18'));

  return (
    <div>
      <p>{date}</p>
      <p>This is home page</p>
    </div>
  )
}

export default Home;
