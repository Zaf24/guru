import { Clock, Star, Shield, Users, Zap } from "lucide-react";
import { useLocation } from "react-router-dom";

const studentFeatures = [
  {
    name: "Quick Matching",
    description: "Find a qualified tutor within minutes. No lengthy searching or complicated processes.",
    icon: Zap
  },
  {
    name: "Verified Tutors",
    description: "Every tutor is pre-screened and verified for their academic credentials and experience.",
    icon: Shield
  },
  {
    name: "Easy Scheduling",
    description: "Book sessions that fit your schedule. Manage all your tutoring sessions in one place.",
    icon: Clock
  },
  {
    name: "Direct Communication",
    description: "Message your tutor directly to discuss your needs and learning goals.",
    icon: Users
  }
];

const tutorFeatures = [
  {
    name: "Fast Onboarding",
    description: "Complete your profile and start accepting students in as little as 24 hours.",
    icon: Zap
  },
  {
    name: "Full Control",
    description: "Set your own rates, choose your subjects, and manage your availability.",
    icon: Shield
  },
  {
    name: "Simple Booking",
    description: "Accept or decline session requests with one click. No complex scheduling.",
    icon: Clock
  },
  {
    name: "Direct Payments",
    description: "Get paid directly to your account after each session. No waiting periods.",
    icon: Star
  }
];

export default function Features() {
  const location = useLocation();
  const isTutorPage = location.pathname === '/tutor';
  const features = isTutorPage ? tutorFeatures : studentFeatures;

  return (
    <div className="bg-white py-24 sm:py-32" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-orange-600">
            {isTutorPage ? "Simple & Straightforward" : "Easy to Get Started"}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {isTutorPage 
              ? "Everything you need to start tutoring"
              : "Find help in just a few clicks"
            }
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {isTutorPage
              ? "We've simplified the tutoring process so you can focus on what matters - teaching."
              : "Getting the help you need shouldn't be complicated. We've made it simple."
            }
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-start">
                <div className={`rounded-lg p-2 ring-1 ${
                  isTutorPage 
                    ? 'bg-orange-600 ring-orange-600' 
                    : 'bg-orange-600 ring-orange-600'
                }`}>
                  <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <dt className="mt-4 font-semibold text-gray-900 text-left">{feature.name}</dt>
                <dd className="mt-2 leading-7 text-gray-600 text-left">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
} 