
root = User.create(email: "root@blew.io", 
                   password: "1020304050",
                   confirmed_at: Time.now)

Snippet.create(title: "Example 1", content: "example.map(&:id)", language: "ruby", creator: root)
Snippet.create(title: "Example 2", content: "example.map(&:id)", language: "ruby", creator: root)
Snippet.create(title: "Example 3", content: "example.map(&:id)", language: "ruby", creator: root)
Snippet.create(title: "Example 4", content: "example.map(&:id)", language: "ruby", creator: root)