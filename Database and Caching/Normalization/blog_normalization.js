// Blog System Data Normalization Example

// Unnormalized Data Structure
const unnormalizedPosts = [
    {
        postId: 1,
        title: "Getting Started with JavaScript",
        content: "JavaScript is a programming language...",
        authorName: "John Doe",
        authorEmail: "john@example.com",
        authorBio: "Full-stack developer",
        publishDate: "2024-03-15",
        categories: ["Programming", "JavaScript", "Web Development"],
        tags: ["beginner", "tutorial", "coding"],
        comments: [
            {
                commentId: 1,
                commenterName: "Alice Smith",
                commenterEmail: "alice@example.com",
                commentText: "Great article!",
                commentDate: "2024-03-16"
            },
            {
                commentId: 2,
                commenterName: "Bob Johnson",
                commenterEmail: "bob@example.com",
                commentText: "Very helpful!",
                commentDate: "2024-03-17"
            }
        ]
    },
    {
        postId: 2,
        title: "Advanced JavaScript Patterns",
        content: "Let's explore some advanced patterns...",
        authorName: "John Doe", // Duplicate author data
        authorEmail: "john@example.com",
        authorBio: "Full-stack developer",
        publishDate: "2024-03-18",
        categories: ["Programming", "JavaScript", "Design Patterns"],
        tags: ["advanced", "patterns", "coding"],
        comments: [
            {
                commentId: 3,
                commenterName: "Alice Smith", // Duplicate commenter data
                commenterEmail: "alice@example.com",
                commentText: "Excellent explanation!",
                commentDate: "2024-03-19"
            }
        ]
    }
];

// Normalized Data Structure
const normalizedBlogData = {
    authors: [
        {
            authorId: 1,
            name: "John Doe",
            email: "john@example.com",
            bio: "Full-stack developer"
        }
    ],
    posts: [
        {
            postId: 1,
            authorId: 1,
            title: "Getting Started with JavaScript",
            content: "JavaScript is a programming language...",
            publishDate: "2024-03-15"
        },
        {
            postId: 2,
            authorId: 1,
            title: "Advanced JavaScript Patterns",
            content: "Let's explore some advanced patterns...",
            publishDate: "2024-03-18"
        }
    ],
    categories: [
        { categoryId: 1, name: "Programming" },
        { categoryId: 2, name: "JavaScript" },
        { categoryId: 3, name: "Web Development" },
        { categoryId: 4, name: "Design Patterns" }
    ],
    postCategories: [
        { postId: 1, categoryId: 1 },
        { postId: 1, categoryId: 2 },
        { postId: 1, categoryId: 3 },
        { postId: 2, categoryId: 1 },
        { postId: 2, categoryId: 2 },
        { postId: 2, categoryId: 4 }
    ],
    tags: [
        { tagId: 1, name: "beginner" },
        { tagId: 2, name: "tutorial" },
        { tagId: 3, name: "coding" },
        { tagId: 4, name: "advanced" },
        { tagId: 5, name: "patterns" }
    ],
    postTags: [
        { postId: 1, tagId: 1 },
        { postId: 1, tagId: 2 },
        { postId: 1, tagId: 3 },
        { postId: 2, tagId: 4 },
        { postId: 2, tagId: 5 },
        { postId: 2, tagId: 3 }
    ],
    commenters: [
        {
            commenterId: 1,
            name: "Alice Smith",
            email: "alice@example.com"
        },
        {
            commenterId: 2,
            name: "Bob Johnson",
            email: "bob@example.com"
        }
    ],
    comments: [
        {
            commentId: 1,
            postId: 1,
            commenterId: 1,
            text: "Great article!",
            date: "2024-03-16"
        },
        {
            commentId: 2,
            postId: 1,
            commenterId: 2,
            text: "Very helpful!",
            date: "2024-03-17"
        },
        {
            commentId: 3,
            postId: 2,
            commenterId: 1,
            text: "Excellent explanation!",
            date: "2024-03-19"
        }
    ]
};

// Function to demonstrate data retrieval from normalized structure
function getPostDetails(postId) {
    const post = normalizedBlogData.posts.find(p => p.postId === postId);
    const author = normalizedBlogData.authors.find(a => a.authorId === post.authorId);
    
    // Get categories
    const postCategories = normalizedBlogData.postCategories
        .filter(pc => pc.postId === postId)
        .map(pc => normalizedBlogData.categories.find(c => c.categoryId === pc.categoryId).name);
    
    // Get tags
    const postTags = normalizedBlogData.postTags
        .filter(pt => pt.postId === postId)
        .map(pt => normalizedBlogData.tags.find(t => t.tagId === pt.tagId).name);
    
    // Get comments with commenter details
    const comments = normalizedBlogData.comments
        .filter(c => c.postId === postId)
        .map(c => {
            const commenter = normalizedBlogData.commenters.find(cm => cm.commenterId === c.commenterId);
            return {
                text: c.text,
                date: c.date,
                commenter: {
                    name: commenter.name,
                    email: commenter.email
                }
            };
        });

    return {
        postId: post.postId,
        title: post.title,
        content: post.content,
        publishDate: post.publishDate,
        author: {
            name: author.name,
            email: author.email,
            bio: author.bio
        },
        categories: postCategories,
        tags: postTags,
        comments: comments
    };
}

// Function to demonstrate data update in normalized structure
function updateAuthorBio(authorId, newBio) {
    const author = normalizedBlogData.authors.find(a => a.authorId === authorId);
    if (author) {
        author.bio = newBio;
    }
}

// Example usage and improvements demonstration
console.log("=== Blog System Data Normalization Example ===\n");

// 1. Data Redundancy
console.log("1. Data Redundancy Reduction:");
console.log("Unnormalized: Author data repeated for each post");
console.log("Normalized: Author data stored once, referenced by ID\n");

// 2. Data Consistency
console.log("2. Data Consistency:");
console.log("Unnormalized: Author bio might be inconsistent across posts");
console.log("Normalized: Author bio stored in one place, ensuring consistency\n");

// 3. Data Updates
console.log("3. Data Updates:");
console.log("Unnormalized: Need to update author bio in multiple places");
console.log("Normalized: Update author bio once, affects all references\n");

// 4. Query Efficiency
console.log("4. Query Efficiency:");
console.log("Unnormalized: Need to search through all posts to find author data");
console.log("Normalized: Direct access to author data through authorId\n");

// 5. Storage Efficiency
console.log("5. Storage Efficiency:");
console.log("Unnormalized: Duplicate data increases storage requirements");
console.log("Normalized: Reduced storage through elimination of redundancy\n");

// Demonstrate data retrieval
console.log("=== Example: Retrieving Post Details ===");
const postDetails = getPostDetails(1);
console.log(JSON.stringify(postDetails, null, 2));

// Demonstrate data update
console.log("\n=== Example: Updating Author Bio ===");
updateAuthorBio(1, "Senior Full-stack Developer");
console.log("Updated author bio"); 