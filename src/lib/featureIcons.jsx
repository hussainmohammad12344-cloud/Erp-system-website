import {
    WalletOutlined,
    ShoppingCartOutlined,
    StockOutlined,
    FileTextOutlined,
    ShopOutlined,
    BarChartOutlined,
    TeamOutlined,
    SettingOutlined,
    CloudOutlined,
    SafetyOutlined,
} from "@ant-design/icons"

const iconComponents = {
    WalletOutlined,
    ShoppingCartOutlined,
    StockOutlined,
    FileTextOutlined,
    ShopOutlined,
    BarChartOutlined,
    TeamOutlined,
    SettingOutlined,
    CloudOutlined,
    SafetyOutlined,
}

export function getFeatureIcon(name, className = "text-2xl") {
    const Icon = iconComponents[name] || FileTextOutlined
    return <Icon className={className} />
}
