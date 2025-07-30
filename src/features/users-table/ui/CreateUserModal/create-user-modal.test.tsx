import { screen, render, fireEvent } from "@testing-library/react";
import { CreateUserModal } from "./create-user-modal";
import type { UserForm } from "@/shared/lib/types";
import { userEvent } from "@testing-library/user-event";

describe("CreateUserModal", () => {
  const defaultFormData: UserForm = {
    name: "",
    email: "",
    role: "user",
    status: "active",
  };

  const setup = (propsOverride = {}) => {
    const props = {
      isCreateDialogOpen: true,
      setIsCreateDialogOpen: jest.fn(),
      formData: defaultFormData,
      setFormData: jest.fn(),
      isLoading: false,
      handleCreateUser: jest.fn(),
      ...propsOverride,
    };

    render(<CreateUserModal {...props} />);
    return props;
  };

  test("renders modal with input and button", () => {
    setup();

    expect(screen.getByText("Create New User")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Create User")).toBeInTheDocument();
  });

  test("opens modal on trigger button click", async () => {
    const setIsCreateDialogOpen = jest.fn();
    setup({ isCreateDialogOpen: false, setIsCreateDialogOpen });

    const button = screen.getByTestId("add-user-modal-btn");
    await userEvent.click(button);

    expect(setIsCreateDialogOpen).toHaveBeenCalledWith(true);
  });

  test("disables button while loading", () => {
    setup({ isLoading: true });

    const button = screen.getByRole("button", { name: /creating/i });
    expect(button).toBeDisabled();
  });

  test("updates form fields on input change", () => {
  const setFormData = jest.fn();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setFormData: _ } = setup({ setFormData });

  fireEvent.change(screen.getByLabelText("Name"), {
    target: { value: "John Doe" },
  });

  expect(setFormData).toHaveBeenCalledWith(
    expect.objectContaining({ name: "John Doe" })
  );
});
});
