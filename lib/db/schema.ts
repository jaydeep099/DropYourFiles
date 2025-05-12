import {pgTable , text, uuid , integer , boolean , timestamp} from  "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";  

export const files = pgTable("files",{
    id : uuid("id").defaultRandom().primaryKey(),

    //basic file/folder information
    name: text("name").notNull(),
    path:text("path").notNull(),
    size:integer("size").notNull(),
    type:text("type").notNull(),

    //storage information 
    fileUrl: text("file_url").notNull(),
    thumbnailUrl:text("thumbnail_url"),

    //owner
    userId:text("user_id").notNull(),
    parentId:uuid("parent_id"), // parent folder if there

    // file/folder flags
    isFolder : boolean("is_folder").default(false).notNull(),
    isStarred : boolean("is_starred").default(false).notNull(),
    isTrash :boolean("is_trash").default(false),

    // timestamps
    createdAt : timestamp("created_at").defaultNow().notNull(),
    updatedAt : timestamp("updated_at").defaultNow().notNull()
});

// one parent folder can have many children file or folder.
export const filesRelations = relations(files,({one,many})=>({
    parent: one(files,{
        fields:[files.parentId],
        references:[files.id]
    }),
    children:many(files)
}))

// type defination
export const File = typeof files.$inferSelect;
export const NewFile = typeof files.$inferInsert;