import { currentUser } from '@clerk/nextjs/server';
import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from './ui/card';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { Button } from './ui/button';
import { getUserByClerkId } from '@/actions/user.action';
import { Avatar, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { LinkIcon, MapPinIcon } from 'lucide-react';

async function Sidebar() {
  try {
    const authUser = await currentUser();
    if (!authUser) return <UnAuthenticatedSidebar />;

    const user = await getUserByClerkId(authUser.id);
    if (!user) return <UnAuthenticatedSidebar />;

    return (
      <div className="sticky top-20">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Link 
                href={`/profile/${user.username}`} 
                className="flex flex-col items-center justify-center"
              >
                <Avatar className="w-20 h-20 border-2">
                  <AvatarImage 
                    src={user.image || "/avatar.png"} 
                    alt={`${user.name}'s profile picture`} 
                  />
                </Avatar>
                <div className="mt-4 space-y-1">
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">@{user.username}</p>
                </div>
              </Link>
              
              {user.bio && (
                <p className="mt-3 text-sm text-muted-foreground">{user.bio}</p>
              )}
              
              <div className="w-full">
                <Separator className="my-4" />
                <div className="flex justify-around">
                  <div className="text-center">
                    <p className="font-medium">{user._count?.following ?? 0}</p>
                    <p className="text-xs text-muted-foreground">Following</p>
                  </div>
                  <Separator orientation="vertical" />
                  <div className="text-center">
                    <p className="font-medium">{user._count?.followers ?? 0}</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                </div>
                <Separator className="my-4" />
              </div>
              
              <div className="w-full space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  <span>{user.location || "No location set"}</span>
                </div>
                
                <div className="flex items-center text-muted-foreground">
                  <LinkIcon className="w-4 h-4 mr-2 shrink-0" />
                  {user.website ? (
                    <a 
                      href={user.website.startsWith('http') ? user.website : `https://${user.website}`} 
                      className="hover:underline truncate max-w-full" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {user.website}
                    </a>
                  ) : (
                    "No website"
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error('Error in Sidebar component:', error);
    return <UnAuthenticatedSidebar />;
  }
}

export default Sidebar;

function UnAuthenticatedSidebar() {
  return (
    <div className='sticky top-20'>
      <Card>
        <CardContent className="py-6">
          <h2 className='text-center text-xl font-semibold mb-4'>
            Welcome Back!
          </h2>
          <p className='text-center text-muted-foreground mb-4'>
            Login to access your profile and connect with others
          </p>
          <div className="space-y-2">
            <SignInButton mode='modal'>
              <Button className='w-full' variant="outline">
                Login
              </Button>
            </SignInButton>
            <SignUpButton mode='modal'>
              <Button className='w-full' variant="default">
                Sign Up
              </Button>
            </SignUpButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}