import AppContainer from "@/components/app/container/container";
import SecuritySection from "./security";

export default function SettingsFeature() {
	return (
		<AppContainer className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-gray-900">Settings</h1>
				<p className="text-gray-600">Manage your account security settings</p>
			</div>

			<SecuritySection />
		</AppContainer>
	);
}

