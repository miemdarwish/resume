const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() || ""

// Set to true to show the maintenance page, false to show the normal site
export const MAINTENANCE_MODE = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "false" ? false : true

// Set to false to reveal address and phone number on the site
export const HIDE_CONTACT_DETAILS = process.env.NEXT_PUBLIC_HIDE_CONTACT_DETAILS === "false" ? false : true

export function withBasePath(path: string) {
  if (!path.startsWith("/")) {
    return path
  }

  return publicBasePath ? `${publicBasePath}${path}` : path
}

