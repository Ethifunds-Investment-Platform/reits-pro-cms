// import PasswordSection from "./password-section";
// import PinSection from "./pin-section";

// export default function SecuritySection() {
// 	return (
// 		<div className="space-y-6 xl:max-w-md mx-auto">
// 			<PasswordSection />
// 			<PinSection />
// 		</div>
// 	);
// }

import useAppSelector from "@/store/hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PasswordSection from "./password-section";
import PinSection from "./pin-section";

export default function SecuritySection() {
	return (
		<Tabs defaultValue="password" className="space-y-6">
			<TabsList className=" gap-5">
				<TabsTrigger value="password">Reset Password</TabsTrigger>
				<TabsTrigger value="pin">Set/Reset PIN</TabsTrigger>
			</TabsList>

			<TabsContent value="password" className="w-1/2 mx-auto">
				<PasswordSection />
			</TabsContent>

			<TabsContent value="pin" className="w-1/2 mx-auto">
				<PinSection />
			</TabsContent>
		</Tabs>
	);
}
