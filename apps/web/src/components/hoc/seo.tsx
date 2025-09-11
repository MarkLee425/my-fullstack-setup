import type { ComponentType } from "react";
import React from "react";
import { Helmet } from "react-helmet-async";
import type {
	AlternateLinkDescriptor,
	OpenGraphWebsite,
	Robots,
	SeoProps,
	TwitterSummary,
} from "@/types/seo";

// Helper function to convert robots object to string
const formatRobots = (robots: string | Robots): string => {
	if (typeof robots === "string") return robots;

	const parts: string[] = [];
	if (robots.index === false) parts.push("noindex");
	else if (robots.index === true) parts.push("index");

	if (robots.follow === false) parts.push("nofollow");
	else if (robots.follow === true) parts.push("follow");

	if (robots.noarchive) parts.push("noarchive");
	if (robots.nosnippet) parts.push("nosnippet");
	if (robots.noimageindex) parts.push("noimageindex");
	if (robots.nocache) parts.push("nocache");
	if (robots.notranslate) parts.push("notranslate");

	return parts.join(", ") || "index, follow";
};

// Helper function to format keywords
const formatKeywords = (
	keywords: string[] | string | null | undefined,
): string | undefined => {
	if (!keywords) return undefined;
	return Array.isArray(keywords) ? keywords.join(", ") : keywords;
};

// Helper function to resolve URL
const resolveUrl = (
	url: string | URL | AlternateLinkDescriptor | null | undefined,
	base?: string,
): string | undefined => {
	if (!url) return undefined;
	if (typeof url === "object" && "url" in url) {
		url = url.url;
	}
	const urlString = url.toString();
	if (urlString.startsWith("http")) return urlString;
	if (base) return new URL(urlString, base).toString();
	return urlString;
};

const withSeo =
	(seoProps: SeoProps) =>
	<P extends Record<string, any>>(
		WrappedComponent: ComponentType<P>,
	): ComponentType<P> => {
		const SeoEnhanced = (componentProps: P) => {
			// Extract SEO-relevant props, with seoProps as defaults
			const {
				title = seoProps.title,
				description = seoProps.description,
				keywords = seoProps.keywords,
				robots = seoProps.robots,
				openGraph = seoProps.openGraph,
				twitter = seoProps.twitter,
				icons = seoProps.icons,
				alternates = seoProps.alternates,
				viewport = seoProps.viewport,
				themeColor = seoProps.themeColor,
				authors = seoProps.authors,
				generator = seoProps.generator,
				applicationName = seoProps.applicationName,
				referrer = seoProps.referrer,
				creator = seoProps.creator,
				publisher = seoProps.publisher,
				manifest = seoProps.manifest,
				verification = seoProps.verification,
				appleWebApp = seoProps.appleWebApp,
				formatDetection = seoProps.formatDetection,
				...otherProps
			} = { ...seoProps, ...componentProps } as P & SeoProps;

			return (
				<>
					<Helmet>
						{/* Basic Meta Tags */}
						{title && <title>{title}</title>}
						{description && <meta name="description" content={description} />}
						{formatKeywords(keywords) && (
							<meta name="keywords" content={formatKeywords(keywords)} />
						)}
						{applicationName && (
							<meta name="application-name" content={applicationName} />
						)}
						{generator && <meta name="generator" content={generator} />}
						{creator && <meta name="creator" content={creator} />}
						{publisher && <meta name="publisher" content={publisher} />}
						{referrer && <meta name="referrer" content={referrer} />}

						{/* Authors */}
						{authors &&
							(Array.isArray(authors) ? authors : [authors]).map(
								(author, index) => (
									<React.Fragment key={index}>
										{author.name && (
											<meta name="author" content={author.name} />
										)}
										{author.url && (
											<link rel="author" href={resolveUrl(author.url)} />
										)}
									</React.Fragment>
								),
							)}

						{/* Robots */}
						{robots && <meta name="robots" content={formatRobots(robots)} />}

						{/* Viewport (if not using separate viewport export) */}
						{viewport && (
							<meta
								name="viewport"
								content={
									typeof viewport === "string"
										? viewport
										: `width=${viewport.width || "device-width"}, initial-scale=${viewport.initialScale || 1}`
								}
							/>
						)}

						{/* Theme Color */}
						{themeColor &&
							(typeof themeColor === "string" ? (
								<meta name="theme-color" content={themeColor} />
							) : Array.isArray(themeColor) ? (
								themeColor.map((color, index) => (
									<meta
										key={index}
										name="theme-color"
										content={color.color}
										media={color.media}
									/>
								))
							) : (
								<meta
									name="theme-color"
									content={themeColor.color}
									media={themeColor.media}
								/>
							))}

						{/* Canonical URL */}
						{alternates?.canonical && (
							<link rel="canonical" href={resolveUrl(alternates.canonical)} />
						)}

						{/* Alternate Languages */}
						{alternates?.languages &&
							Object.entries(alternates.languages).map(([lang, url]) => {
								const resolvedUrl = Array.isArray(url) ? url[0] : url;
								return (
									resolvedUrl && (
										<link
											key={lang}
											rel="alternate"
											hrefLang={lang}
											href={resolveUrl(resolvedUrl)}
										/>
									)
								);
							})}

						{/* Icons */}
						{icons &&
							(() => {
								if (typeof icons === "string" || icons instanceof URL) {
									return <link rel="icon" href={resolveUrl(icons)} />;
								}
								if (Array.isArray(icons)) {
									return icons.map((icon, index) => (
										<link
											key={index}
											rel="icon"
											href={resolveUrl(
												typeof icon === "string"
													? icon
													: icon instanceof URL
														? icon.toString()
														: icon.url,
											)}
										/>
									));
								}
								// Icons object
								return Object.entries(icons).map(([rel, iconData]) => {
									if (!iconData) return null;
									const iconArray = Array.isArray(iconData)
										? iconData
										: [iconData];
									return iconArray.map((icon, index) => {
										const iconUrl =
											typeof icon === "string"
												? icon
												: icon instanceof URL
													? icon.toString()
													: icon.url;
										const iconRel =
											rel === "apple"
												? "apple-touch-icon"
												: rel === "shortcut"
													? "shortcut icon"
													: "icon";
										return (
											<link
												key={`${rel}-${index}`}
												rel={iconRel}
												href={resolveUrl(iconUrl)}
												{...(typeof icon === "object" &&
													!(icon instanceof URL) &&
													icon.sizes && { sizes: icon.sizes })}
												{...(typeof icon === "object" &&
													!(icon instanceof URL) &&
													icon.type && { type: icon.type })}
											/>
										);
									});
								});
							})()}

						{/* Manifest */}
						{manifest && <link rel="manifest" href={resolveUrl(manifest)} />}

						{/* Open Graph */}
						{openGraph && (
							<>
								<meta
									property="og:type"
									content={
										openGraph.hasOwnProperty("type")
											? (openGraph as OpenGraphWebsite).type
											: "website"
									}
								/>
								{openGraph.title && (
									<meta property="og:title" content={openGraph.title} />
								)}
								{openGraph.description && (
									<meta
										property="og:description"
										content={openGraph.description}
									/>
								)}
								{openGraph.url && (
									<meta property="og:url" content={resolveUrl(openGraph.url)} />
								)}
								{openGraph.siteName && (
									<meta property="og:site_name" content={openGraph.siteName} />
								)}
								{openGraph.locale && (
									<meta property="og:locale" content={openGraph.locale} />
								)}

								{/* OG Images */}
								{openGraph.images &&
									(Array.isArray(openGraph.images)
										? openGraph.images
										: [openGraph.images]
									).map((image, index) => {
										const imageUrl =
											typeof image === "string"
												? image
												: image instanceof URL
													? image.toString()
													: image.url;
										return (
											<React.Fragment key={index}>
												<meta
													property="og:image"
													content={resolveUrl(imageUrl)}
												/>
												{typeof image === "object" &&
													!(image instanceof URL) &&
													image.alt && (
														<meta property="og:image:alt" content={image.alt} />
													)}
												{typeof image === "object" &&
													!(image instanceof URL) &&
													image.width && (
														<meta
															property="og:image:width"
															content={image.width.toString()}
														/>
													)}
												{typeof image === "object" &&
													!(image instanceof URL) &&
													image.height && (
														<meta
															property="og:image:height"
															content={image.height.toString()}
														/>
													)}
											</React.Fragment>
										);
									})}
							</>
						)}

						{/* Twitter */}
						{twitter && (
							<>
								<meta
									name="twitter:card"
									content={
										twitter.hasOwnProperty("card")
											? (twitter as TwitterSummary).card
											: "summary"
									}
								/>
								{twitter.site && (
									<meta name="twitter:site" content={twitter.site} />
								)}
								{twitter.creator && (
									<meta name="twitter:creator" content={twitter.creator} />
								)}
								{twitter.title && (
									<meta name="twitter:title" content={twitter.title} />
								)}
								{twitter.description && (
									<meta
										name="twitter:description"
										content={twitter.description}
									/>
								)}

								{/* Twitter Images */}
								{twitter.images &&
									(Array.isArray(twitter.images)
										? twitter.images
										: [twitter.images]
									).map((image, index) => {
										const imageUrl =
											typeof image === "string"
												? image
												: image instanceof URL
													? image
													: image.url;
										return (
											<React.Fragment key={index}>
												<meta
													name="twitter:image"
													content={resolveUrl(imageUrl)}
												/>
												{typeof image === "object" &&
													!(image instanceof URL) &&
													image.alt && (
														<meta
															name="twitter:image:alt"
															content={image.alt}
														/>
													)}
											</React.Fragment>
										);
									})}
							</>
						)}

						{/* Verification */}
						{verification &&
							Object.entries(verification).map(([key, value]) => {
								if (!value) return null;
								const values = Array.isArray(value) ? value : [value];
								return values.map((val, index) => (
									<meta
										key={`${key}-${index}`}
										name={`${key}-site-verification`}
										content={val.toString()}
									/>
								));
							})}

						{/* Apple Web App */}
						{appleWebApp && (
							<>
								{(appleWebApp === true ||
									(typeof appleWebApp === "object" && appleWebApp.capable)) && (
									<meta name="apple-mobile-web-app-capable" content="yes" />
								)}
								{typeof appleWebApp === "object" && appleWebApp.title && (
									<meta
										name="apple-mobile-web-app-title"
										content={appleWebApp.title}
									/>
								)}
								{typeof appleWebApp === "object" &&
									appleWebApp.statusBarStyle && (
										<meta
											name="apple-mobile-web-app-status-bar-style"
											content={appleWebApp.statusBarStyle}
										/>
									)}
							</>
						)}

						{/* Format Detection */}
						{formatDetection && (
							<meta
								name="format-detection"
								content={Object.entries(formatDetection)
									.map(([key, value]) => `${key}=${value ? "yes" : "no"}`)
									.join(", ")}
							/>
						)}

						{/* Schema Markup */}
						{seoProps.schemaMarkup && (
							<script type="application/ld+json">
								{JSON.stringify(seoProps.schemaMarkup)}
							</script>
						)}
					</Helmet>

					<WrappedComponent {...(otherProps as P)} />
				</>
			);
		};

		SeoEnhanced.displayName = `withSeo(${WrappedComponent.displayName || WrappedComponent.name})`;
		return SeoEnhanced;
	};

export default withSeo;
