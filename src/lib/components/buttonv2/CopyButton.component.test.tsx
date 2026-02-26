import "@testing-library/jest-dom";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { getWrapper } from "../../testUtils";
import { CopyButton } from "./CopyButton.component";

describe("CopyButton", () => {
	const { Wrapper } = getWrapper();
	const originalClipboard = navigator.clipboard;

	beforeEach(() => {
		Object.assign(navigator, {
			clipboard: {
				writeText: jest.fn(),
				write: jest.fn(),
			},
		});
		// JSDOM doesn't define ClipboardItem; needed for copyAsHtml path. Stub only — full interface not needed for tests.
		if (typeof globalThis.ClipboardItem === "undefined") {
			// @ts-expect-error — intentional stub for JSDOM; global ClipboardItem type expects full interface (getType, types, etc.)
			globalThis.ClipboardItem = class {};
		}
	});

	afterEach(() => {
		Object.assign(navigator, { clipboard: originalClipboard });
		jest.restoreAllMocks();
	});

	it("when writeText returns a rejected Promise, should enter the unsupported state", async () => {
		const writeTextMock = navigator.clipboard.writeText as jest.Mock;
		writeTextMock.mockRejectedValueOnce(new Error("Clipboard denied"));

		render(<CopyButton textToCopy="test" />, { wrapper: Wrapper });

		const button = screen.getByRole("button", { name: "Copy" });
		await act(() => userEvent.click(button));

		await waitFor(() => {
			expect(writeTextMock).toHaveBeenCalledWith("test");
		});

		// Unsupported state: button should not show success, and not be aria-disabled
		expect(
			screen.queryByRole("button", { name: "Copied !" }),
		).not.toBeInTheDocument();
		const buttonAfterReject = screen.getByRole("button", { name: "Copy" });
		expect(buttonAfterReject).not.toHaveAttribute("aria-disabled", "true");
	});

	it("during success state click does nothing; after 2s resets to idle and click works again", async () => {
		jest.useFakeTimers();
		try {
			const writeTextMock = navigator.clipboard.writeText as jest.Mock;
			writeTextMock.mockResolvedValue(undefined);

			render(<CopyButton textToCopy="test" />, { wrapper: Wrapper });

			await act(() =>
				userEvent.click(screen.getByRole("button", { name: "Copy" })),
			);

			await waitFor(() => {
				expect(
					screen.getByRole("button", { name: "Copied !" }),
				).toBeInTheDocument();
			});

			expect(writeTextMock).toHaveBeenCalledTimes(1);
			const inSuccess = screen.getByRole("button", { name: "Copied !" });
			expect(inSuccess).toHaveAttribute("aria-disabled", "true");

			await act(() => userEvent.click(inSuccess));
			expect(writeTextMock).toHaveBeenCalledTimes(1);

			act(() => {
				jest.advanceTimersByTime(2000);
			});

			await waitFor(() => {
				expect(
					screen.getByRole("button", { name: "Copy" }),
				).toBeInTheDocument();
				expect(
					screen.getByRole("button", { name: "Copy" }),
				).not.toHaveAttribute("aria-disabled", "true");
			});

			await act(() =>
				userEvent.click(screen.getByRole("button", { name: "Copy" })),
			);

			await waitFor(() => {
				expect(writeTextMock).toHaveBeenCalledTimes(2);
			});
		} finally {
			jest.useRealTimers();
		}
	});

	it("standard copy (writeText): on success shows Copied ! tooltip and aria-disabled", async () => {
		const writeTextMock = navigator.clipboard.writeText as jest.Mock;
		writeTextMock.mockResolvedValueOnce(undefined);

		render(<CopyButton textToCopy="hello" />, { wrapper: Wrapper });

		await act(() =>
			userEvent.click(screen.getByRole("button", { name: "Copy" })),
		);

		await waitFor(() => {
			expect(writeTextMock).toHaveBeenCalledWith("hello");
			const button = screen.getByRole("button", { name: "Copied !" });
			expect(button).toHaveAttribute("aria-disabled", "true");
		});
	});

	it("copyAsHtml: calls clipboard.write and on success shows Copied ! and aria-disabled", async () => {
		const writeMock = navigator.clipboard.write as jest.Mock;
		writeMock.mockResolvedValueOnce(undefined);

		render(<CopyButton textToCopy="<b>hi</b>" copyAsHtml />, {
			wrapper: Wrapper,
		});

		await act(() =>
			userEvent.click(screen.getByRole("button", { name: "Copy" })),
		);

		await waitFor(() => {
			expect(writeMock).toHaveBeenCalledTimes(1);
			expect(writeMock.mock.calls[0][0]).toHaveLength(1);
			expect(
				screen.getByRole("button", { name: "Copied !" }),
			).toBeInTheDocument();
			expect(screen.getByRole("button", { name: "Copied !" })).toHaveAttribute(
				"aria-disabled",
				"true",
			);
		});
	});

	it("copyAsHtml: when write rejects, enters unsupported state", async () => {
		const writeMock = navigator.clipboard.write as jest.Mock;
		writeMock.mockRejectedValueOnce(new Error("Denied"));

		render(<CopyButton textToCopy="<b>hi</b>" copyAsHtml />, {
			wrapper: Wrapper,
		});

		await act(() =>
			userEvent.click(screen.getByRole("button", { name: "Copy" })),
		);

		await waitFor(() => {
			expect(writeMock).toHaveBeenCalled();
		});

		expect(
			screen.queryByRole("button", { name: "Copied !" }),
		).not.toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Copy" })).not.toHaveAttribute(
			"aria-disabled",
			"true",
		);
	});

	it("ghost variant without label: tooltip is Copy then Copied ! on success", async () => {
		const writeTextMock = navigator.clipboard.writeText as jest.Mock;
		writeTextMock.mockResolvedValueOnce(undefined);

		render(<CopyButton textToCopy="x" />, { wrapper: Wrapper });

		expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();

		await act(() =>
			userEvent.click(screen.getByRole("button", { name: "Copy" })),
		);

		await waitFor(() => {
			expect(
				screen.getByRole("button", { name: "Copied !" }),
			).toBeInTheDocument();
		});
	});

	it("ghost variant with label: tooltip is Copy {label} then Copied ! on success", async () => {
		const writeTextMock = navigator.clipboard.writeText as jest.Mock;
		writeTextMock.mockResolvedValueOnce(undefined);

		render(<CopyButton textToCopy="x" label="key" />, { wrapper: Wrapper });

		expect(
			screen.getByRole("button", { name: "Copy key" }),
		).toBeInTheDocument();

		await act(() =>
			userEvent.click(screen.getByRole("button", { name: "Copy key" })),
		);

		await waitFor(() => {
			expect(
				screen.getByRole("button", { name: "Copied !" }),
			).toBeInTheDocument();
		});
	});

	it("outline variant without label: tooltip is Copy then Copied! on success", async () => {
		const writeTextMock = navigator.clipboard.writeText as jest.Mock;
		writeTextMock.mockResolvedValueOnce(undefined);

		render(<CopyButton textToCopy="x" variant="outline" />, {
			wrapper: Wrapper,
		});

		expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();

		await act(() =>
			userEvent.click(screen.getByRole("button", { name: "Copy" })),
		);

		await waitFor(() => {
			expect(
				screen.getByRole("button", { name: "Copied!" }),
			).toBeInTheDocument();
		});
	});

	it("outline variant with label: tooltip is Copy {label} then Copied {label}! on success", async () => {
		const writeTextMock = navigator.clipboard.writeText as jest.Mock;
		writeTextMock.mockResolvedValueOnce(undefined);

		render(<CopyButton variant="outline" textToCopy="x" label="key" />, {
			wrapper: Wrapper,
		});

		expect(
			screen.getByRole("button", { name: "Copy key" }),
		).toBeInTheDocument();

		await act(() =>
			userEvent.click(screen.getByRole("button", { name: "Copy key" })),
		);

		await waitFor(() => {
			expect(
				screen.getByRole("button", { name: "Copied key!" }),
			).toBeInTheDocument();
		});
	});
});
