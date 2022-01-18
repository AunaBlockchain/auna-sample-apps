package main

import (
	"context"
	"fmt"
	"os"

	"github.com/go-resty/resty/v2"
	"golang.org/x/oauth2"
)

func main() {
	args := os.Args[1:]
	clientID := args[0] // First arg, OIDC Client ID
	user := args[1]     // Second arg, Username
	password := args[2] // Third arg, Password

	ctx := context.Background()
	conf := oauth2.Config{
		Endpoint: oauth2.Endpoint{
			TokenURL:  "https://sso.aunablockchain.com/auth/realms/auna/protocol/openid-connect/token",
			AuthURL:   "https://sso.aunablockchain.com/auth/realms/auna/protocol/openid-connect/auth",
			AuthStyle: oauth2.AuthStyleInParams,
		},
		ClientID: clientID,
		Scopes:   []string{"openid", "email", "profile", "roles"}, // add "offline_access" for an offline token with long expiry
	}
	token, err := conf.PasswordCredentialsToken(ctx, user, password)
	if err != nil {
		panic(err)
	}
	fmt.Printf("token: %#v\n", token)
	fmt.Printf("AccessToken: %#v\n", token.AccessToken)

	client := resty.New()
	resp, err := client.R().SetAuthToken(token.AccessToken).Get("https://90249000-0-sample-node-app-01-sample-external-01.aunablockchain.com/")
	fmt.Println("Response Info:")
	fmt.Println("  Error      :", err)
	fmt.Println("  Status Code:", resp.StatusCode())
	fmt.Println("  Status     :", resp.Status())
	fmt.Println("  Proto      :", resp.Proto())
	fmt.Println("  Time       :", resp.Time())
	fmt.Println("  Received At:", resp.ReceivedAt())
	fmt.Println("  Body       :\n", resp)
}
