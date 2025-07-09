'use client';

import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header({ user }) {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/auth/login');
    };

    return (
        <header className="w-full bg-white shadow-sm px-6 py-3 flex justify-between items-center">
            <div className="text-xl font-bold">MyApp</div>

            <nav className="hidden md:flex gap-6">
                <a href="/dashboard" className="text-sm font-medium hover:underline">
                    Dashboard
                </a>
                <a href="/settings" className="text-sm font-medium hover:underline">
                    Settings
                </a>
            </nav>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-full p-0 h-10 w-10">
                        <Avatar>
                            <AvatarImage src="/avatar.png" alt="User Avatar" />
                            <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>{user?.name || 'User'}</DropdownMenuLabel>
                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                        {user?.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push('/profile')}>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
}
