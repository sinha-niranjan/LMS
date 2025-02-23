import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DarkMode from "@/DarkMode";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { Menu, School } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const role = "instructor";

  const [logoutUser, { data, isLoading, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Logged out successfully");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="fixed left-0 right-0 top-0 z-10 h-16 border-b border-b-gray-200 bg-white duration-300 dark:border-b-gray-800 dark:bg-[#0A0A0A]">
      {/* Desktop */}
      <div className="mx-auto hidden h-full max-w-7xl items-center justify-between gap-10 md:flex">
        <Link to={"/"} className="flex items-center gap-3">
          <School size={"30"} />
          <h1 className="hidden text-2xl font-extrabold md:block">
            E-Learning
          </h1>
        </Link>
        {/*  user icons and dark mode icon */}
        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={user?.photoUrl} alt={user?.name} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to={"/my-learning"}>My learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to={"/profile"}>Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "instructor " && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/login")}>Signup</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile Device */}

      <div className="flex h-full items-center justify-between px-4 md:hidden">
        <h1 className="text-2xl font-extrabold">E-Learning</h1>
        {user ? (
          <MobileNavbar role={role} logoutHandler={logoutHandler} />
        ) : (
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button onClick={() => navigate("/login")}>Signup</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = ({ role, logoutHandler }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-gray-200 hover:bg-gray-200"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="mt-2 flex flex-row items-center justify-between">
          <SheetTitle className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            E-Learning
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4">
          <Link to={"/my-learning"}>My Learning</Link>
          <span>
            <Link to={"/profile"}>Edit Profile</Link>
          </span>
          <p onClick={logoutHandler}>Log out</p>
        </nav>
        {role === "instructor" && (
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Dashboard</Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
