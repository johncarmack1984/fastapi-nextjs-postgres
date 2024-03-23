# note: this script did not work perfectly; the comments were instead inserted manually once the parent id had been set
import json

def escape_string(value):
    if value is not None:
        escaped_value = value.replace("'", "''")
        return f"'{escaped_value}'"
    else:
        return 'NULL'

def json_to_sql(json_data):
    insert_queries = []

    for post_index, post in enumerate(json_data, start=1):
        post_values = (
            escape_string(post.get("post_url")),
            escape_string(post.get("title")),
            f"'{post.get('created_at')}'" if post.get("created_at") is not None else 'NULL',
            post.get("num_hugs") if post.get("num_hugs") is not None else 'NULL',
            escape_string(post.get("patient_description")),
            escape_string(post.get("assessment")),
            escape_string(post.get("question"))
        )
        post_query = f"INSERT INTO auxhealth_posts (post_url, title, created_at, num_hugs, patient_description, assessment, question) VALUES ({', '.join(map(str, post_values))});"
        insert_queries.append(post_query)

        comments = post.get("comments", {})
        for comment_key, comment in comments.items():
            parent_id = 'NULL'  # Set parent_id to NULL for top-level comments
            if comment.get("parent_id") in comments:
                parent_id = f"'{comment.get('parent_id')}'"  # Set parent_id to the actual parent_id for nested comments
            comment_values = (
                parent_id,
                escape_string(comment.get("display_name")),
                escape_string(comment.get("text")),
                f"'{comment.get('created_at')}'" if comment.get("created_at") is not None else 'NULL',
                post_index  # Use the index of the post as a placeholder for post_id
            )
            comment_query = f"INSERT INTO auxhealth_comments (parent_id, display_name, text, created_at, post_id) VALUES ({', '.join(map(str, comment_values))});"
            insert_queries.append(comment_query)

    return "\n".join(insert_queries)

if __name__ == "__main__":
    with open("data.json", "r") as file:
        json_data = json.load(file)

    sql_query = json_to_sql(json_data)
    print(sql_query)
