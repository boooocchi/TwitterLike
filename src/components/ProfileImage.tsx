type ProfileImageProps = {
  src?: string | null;
  className?: string;
};
import Image from "next/image";
import { VscAccount } from "react-icons/vsc";

const ProfileImage = ({ src, className = "" }: ProfileImageProps) => {
  return (
    <div
      className={`${className} relative h-12 w-12 overflow-hidden rounded-full`}
    >
      {src == null ? (
        <VscAccount className="h-full w-full" />
      ) : (
        <Image
          className=""
          src={src}
          alt="Profile picture"
          quality={100}
          fill
        />
      )}
    </div>
  );
};

export default ProfileImage;
