import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const CardItem = ({ item }) => {
  console.log(item);
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h3>{item.name}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex w-full">
        <img
          src={item.image}
          alt={item.name}
          className="rounded-md border p-3 shadow-inner h-fit group"
        />
        <div className="flex flex-col gap-2 h-full">
          <p>{item.category}</p>
          <p>{item.constr}</p>
          <span>{item.price}</span>
        </div>
      </CardContent>
      <CardFooter className="flex">
        <p>Sold by :</p>
        <span>User</span>
      </CardFooter>
    </Card>
  );
};
