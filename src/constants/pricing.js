export const BILLING_TYPES = {
    monthly: "monthly",
    yearly: "yearly",
    lifetime: "lifetime",
}

export const BILLING_TYPE_OPTIONS = [
    { value: BILLING_TYPES.monthly, label: "ماهانه" },
    { value: BILLING_TYPES.yearly, label: "سالانه" },
    { value: BILLING_TYPES.lifetime, label: "دایمی" },
]

export const BILLING_TYPE_LABELS = {
    [BILLING_TYPES.monthly]: "ماهانه",
    [BILLING_TYPES.yearly]: "سالانه",
    [BILLING_TYPES.lifetime]: "دایمی",
}
