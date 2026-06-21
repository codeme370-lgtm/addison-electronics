import VideoGuidesClient from './VideoGuidesClient'

export const metadata = {
  title: "Video Guides - Teknova",
  description: "Watch detailed video guides and tutorials about electronics and tech products at Teknova. Learn setup tips, reviews, and more.",
  keywords: ["video guides", "tutorials", "electronics guides", "tech reviews", "Teknova"],
  openGraph: {
    title: "Video Guides - Teknova",
    description: "Learn about electronics and tech products through our comprehensive video guides.",
    url: "/video-guides",
    siteName: "Teknova",
    type: "website",
  },
};

export default function VideoGuidesPage() {
  return <VideoGuidesClient />
}
