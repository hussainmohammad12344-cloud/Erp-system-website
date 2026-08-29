import connectDB from "@/lib/mongodb"
import Feature from "@/models/Feature"
import Faq from "@/models/Faq"
import PricingPlan from "@/models/PricingPlan"
import { DEFAULT_FEATURES } from "@/constants/featureIcons"
import {
    DEFAULT_FAQS,
    DEFAULT_PRICING_PLANS,
} from "@/constants/contentDefaults"
import { ensurePricingPlans } from "@/lib/ensurePricingPlans"
import HeroSection from "@/components/home/HeroSection"
import FeaturesSection from "@/components/home/FeaturesSection"
import HowItWorksSection from "@/components/home/HowItWorksSection"
import PricingSection from "@/components/home/PricingSection"
import TestimonialsSection from "@/components/home/TestimonialsSection"
import FaqSection from "@/components/home/FaqSection"
import CtaSection from "@/components/home/CtaSection"

export const dynamic = "force-dynamic"

function serializeDocs(docs) {
    return docs.map((doc) => {
        const { _id, createdAt, updatedAt, __v, ...rest } = doc
        return {
            ...rest,
            _id: _id?.toString?.() ?? String(_id),
            ...(createdAt
                ? { createdAt: new Date(createdAt).toISOString() }
                : {}),
            ...(updatedAt
                ? { updatedAt: new Date(updatedAt).toISOString() }
                : {}),
        }
    })
}

async function getFeatures() {
    try {
        await connectDB()

        const count = await Feature.countDocuments()
        if (count === 0) {
            await Feature.insertMany(DEFAULT_FEATURES)
        }

        const features = await Feature.find({ isActive: true })
            .sort({ order: 1, createdAt: 1 })
            .lean()

        return serializeDocs(features)
    } catch (error) {
        console.error("Failed to load features:", error)
        return DEFAULT_FEATURES.map((feature, index) => ({
            ...feature,
            _id: `fallback-feature-${index}`,
        }))
    }
}

async function getPricingPlans() {
    try {
        await connectDB()
        await ensurePricingPlans()

        const plans = await PricingPlan.find({ isActive: true })
            .sort({ billingType: 1, order: 1, createdAt: 1 })
            .lean()

        return serializeDocs(plans)
    } catch (error) {
        console.error("Failed to load pricing plans:", error)
        return DEFAULT_PRICING_PLANS.map((plan, index) => ({
            ...plan,
            _id: `fallback-plan-${index}`,
        }))
    }
}

async function getFaqs() {
    try {
        await connectDB()

        const count = await Faq.countDocuments()
        if (count === 0) {
            await Faq.insertMany(DEFAULT_FAQS)
        }

        const faqs = await Faq.find({ isActive: true })
            .sort({ order: 1, createdAt: 1 })
            .lean()

        return serializeDocs(faqs)
    } catch (error) {
        console.error("Failed to load faqs:", error)
        return DEFAULT_FAQS.map((faq, index) => ({
            ...faq,
            _id: `fallback-faq-${index}`,
        }))
    }
}

export default async function Home() {
    const [features, plans, faqs] = await Promise.all([
        getFeatures(),
        getPricingPlans(),
        getFaqs(),
    ])

    return (
        <main>
            <HeroSection />
            <FeaturesSection features={features} />
            <HowItWorksSection />
            <PricingSection plans={plans} />
            <TestimonialsSection />
            <FaqSection faqs={faqs} />
            <CtaSection />
        </main>
    )
}
