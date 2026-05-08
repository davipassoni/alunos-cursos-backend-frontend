import LoginForm from "@/components/LoginForm";
import { loginAction } from "./actions"

export default function LoginPage() {
   
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-white">
            
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-200">
                
                <h1 className="text-3xl font-semibold text-center mb-6 text-black">
                    Login
                </h1>
                <LoginForm onSend={loginAction}/>
              
            </div>

        </div>
    );
}