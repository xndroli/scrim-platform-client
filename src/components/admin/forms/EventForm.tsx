"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { eventSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ImageUpload";
import ColorPicker from "@/components/admin/ColorPicker";
import { createEvent } from "@/lib/admin/actions/event";
import { toast } from "sonner";

interface Props extends Partial<Event> {
        type?: "create" | "update";
}

const EventForm = ({ type, ...event }: Props) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof eventSchema>>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: "",
            description: "",
            creator: "",
            game: "",
            rating: 1,
            totalSlots: 1,
            coverUrl: "",
            coverColor: "",
            videoUrl: "",
            summary: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof eventSchema>) => {
        const result = await createEvent(values);

        if (result.success) {
            toast.success("Success", {
                description: "Event created successfully",
            });

            router.push(`/admin/events/${result.data.id}`);
        } else {
            toast.error("Error",{
                description: result.message,
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name={"title"}
                render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                        <FormLabel className="text-base font-normal text-dark-500">
                            Event Title
                        </FormLabel>
                        <FormControl>
                            <Input
                                required
                                placeholder="Event title"
                                {...field}
                                className="event-form_input"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                    control={form.control}
                    name={"creator"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Creator
                            </FormLabel>
                            <FormControl>
                                <Input
                                    required
                                    placeholder="Event creator"
                                    {...field}
                                    className="event-form_input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"game"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Game
                            </FormLabel>
                            <FormControl>
                                <Input
                                    required
                                    placeholder="Event game"
                                    {...field}
                                    className="event-form_input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={"rating"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Rating
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min={1}
                                    max={5}
                                    placeholder="Event rating"
                                    {...field}
                                    className="event-form_input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={"totalSlots"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Total Slots
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min={1}
                                    max={10000}
                                    placeholder="Total slots"
                                    {...field}
                                    className="event-form_input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={"coverUrl"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Event Image
                            </FormLabel>
                            <FormControl>
                                <ImageUpload
                                    type="image"
                                    accept="image/*"
                                    placeholder="Upload an event cover"
                                    folder="events/covers"
                                    variant="light"
                                    onFileChange={field.onChange}
                                    value={field.value}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"coverColor"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Primary Color
                            </FormLabel>
                            <FormControl>
                                <ColorPicker
                                onPickerChange={field.onChange}
                                value={field.value}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"description"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Event Description
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Event description"
                                    {...field}
                                    rows={10}
                                    className="event-form_input"
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={"videoUrl"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Event Trailer
                            </FormLabel>
                            <FormControl>
                                <ImageUpload
                                    type="video"
                                    accept="video/*"
                                    placeholder="Upload an event trailer"
                                    folder="events/videos"
                                    variant="light"
                                    onFileChange={field.onChange}
                                    value={field.value}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"summary"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Event Summary
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Event summary"
                                    {...field}
                                    rows={5}
                                    className="event-form_input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="event-form_btn text-white">
                    Add event to Raijin
                </Button>
            </form>
        </Form>
    );
};

export default EventForm;