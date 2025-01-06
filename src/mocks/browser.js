/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import { setupWorker } from "msw/browser"; // Explicitly use msw/browser
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);
