#import "AppDelegate.h"
#import <Firebase.h>
#import <React/RCTBundleURLProvider.h>
#import <GoogleMaps/GoogleMaps.h>
#import "RNSplashScreen.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [GMSServices provideAPIKey:@"AIzaSyCh972dP0Wjvcw5iSjusFecbD8KkqKxJdA"];
  [FIRApp configure];
  self.moduleName = @"sogniShop";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  [super application:application didFinishLaunchingWithOptions:launchOptions];
  [RNSplashScreen show];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
