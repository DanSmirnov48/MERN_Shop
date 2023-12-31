import * as z from "zod";
import { Product } from "@/types";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "@/context/AuthContext";
import { ProductReviewValidation } from "@/lib/validation";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { ratingStyle } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type ReviewFormProps = {
  product: Product;
};

const ProductReviewForm = ({ product }: ReviewFormProps) => {
  const { isAuthenticated } = useUserContext();
  const [rating, setRating] = useState<number>(0);

  const form = useForm<z.infer<typeof ProductReviewValidation>>({
    resolver: zodResolver(ProductReviewValidation),
    defaultValues: {
      title: "",
      comment: "",
    },
  });


  const handleSubmit = async (value: z.infer<typeof ProductReviewValidation>) => { };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-3 max-w-wull"
      >

        <Rating
          value={rating}
          onChange={setRating}
          itemStyles={ratingStyle}
          style={{ maxWidth: 150 }}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" className="focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-4" placeholder="Review Title" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea className="h-36 p-4 rounded-xl focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-4" placeholder="Review comment" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <Button type="submit" className="max-w-[15rem] bg-dark-2" disabled={!isAuthenticated}>
          Post
        </Button>
      </form>
    </Form>
  );
};

export default ProductReviewForm;
