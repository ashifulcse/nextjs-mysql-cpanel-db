import '../styles/globals.scss';

export const metadata = {
    title: 'Login Page',
    description: 'Next.js 15 Login UI',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-gray-100">{children}</body>
        </html>
    );
}
