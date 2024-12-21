import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import axios from "axios"


const API_URL = import.meta.env.VITE_API_URL;

const formSchema = z.object({
  firstName: z.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[A-Za-z\s]+$/, "First name should only contain letters"),
  lastName: z.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[A-Za-z\s]+$/, "Last name should only contain letters"),
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be less than 10 digits")
    .regex(/^\+?[0-9]+$/, "Phone number should only contain numbers"),
  email: z.string()
    .email("Invalid email address")
    .min(5, "Email is too short")
    .max(100, "Email is too long"),
  address: z.string()
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must be less than 200 characters")
})

type FormData = z.infer<typeof formSchema>

export default function App() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange"
  })

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitError(null);
      setIsSubmitting(true);

      console.log('Submitting data:', data); // Debug log

      const response = await axios.post(`${API_URL}/api/users`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Response:', response.data); // Debug log

      if (response.data) {
        reset();
        alert('Registration successful!');
      }

    } catch (error) {
      console.error('Submission error:', error); // Debug log

      if (axios.isAxiosError(error)) {
        setSubmitError(error.response?.data.message || 'Failed to register. Please try again.');
      } else {
        setSubmitError('An unexpected error occurred');
      }

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl p-6 space-y-6 bg-white shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-orange-600">Register</h1>
          <p className="text-gray-500">Create your account to get started</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="firstName" className="text-orange-700">First Name</Label>
                <Input
                    id="firstName"
                    {...register("firstName")}
                    aria-invalid={errors.firstName ? "true" : "false"}
                    placeholder="firstname"
                    className={`border-orange-200 focus:border-orange-400 focus:ring-orange-400 ${
                    errors.firstName ? 'border-red-500' : ''
                    }`}
                />
                {errors.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                )}
                </div>

                <div className="space-y-2">
                <Label htmlFor="lastName" className="text-orange-700">Last Name</Label>
                <Input
                    id="lastName"
                    {...register("lastName")}
                    aria-invalid={errors.lastName ? "true" : "false"}
                    placeholder="lastname"
                    className={`border-orange-200 focus:border-orange-400 focus:ring-orange-400 ${
                    errors.lastName ? 'border-red-500' : ''
                    }`}
                />
                {errors.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                )}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone" className="text-orange-700">Mobile Number</Label>
                <Input
                id="phone"
                type="tel"
                {...register("phone")}
                aria-invalid={errors.phone ? "true" : "false"}
                placeholder="+91 99999 55555"
                className={`border-orange-200 focus:border-orange-400 focus:ring-orange-400 ${
                    errors.phone ? 'border-red-500' : ''
                }`}
                />
                {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="email" className="text-orange-700">Email</Label>
                <Input
                id="email"
                type="email"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
                placeholder="youremail@email.com"
                className={`border-orange-200 focus:border-orange-400 focus:ring-orange-400 ${
                    errors.email ? 'border-red-500' : ''
                }`}
                />
                {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="address" className="text-orange-700">Address</Label>
                <Textarea
                id="address"
                {...register("address")}
                aria-invalid={errors.address ? "true" : "false"}
                placeholder="Your Address, City - 000000"
                className={`min-h-[100px] border-orange-200 focus:border-orange-400 focus:ring-orange-400 ${
                    errors.address ? 'border-red-500' : ''
                }`}
                />
                {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
                )}
            </div>

            {submitError && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                {submitError}
                </div>
            )}

            <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white transition-colors"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Registering...' : 'Register'}
            </Button>
            </form>
      </Card>
    </div>
  )
}
