
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-gray-900">Settings</h1>
				<p className="text-gray-600">System configuration and settings</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>System Settings</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-gray-600">Settings features coming soon...</p>
				</CardContent>
			</Card>
		</div>
	);
}
