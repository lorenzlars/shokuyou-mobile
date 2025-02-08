// This file is auto-generated by @hey-api/openapi-ts

export type RecipeIngredientRequestDto = {
    name: string;
    unit: string;
    amount: number;
};

export type RecipeRequestDto = {
    /**
     * Name of the recipe
     */
    name: string;
    /**
     * Description of the recipe
     */
    description?: string;
    /**
     * The recipe source
     */
    source?: string;
    /**
     * The number of servings
     */
    servings?: number;
    /**
     * The recipe duration in minutes
     */
    duration?: number;
    /**
     * The recipe ingredients
     */
    ingredients?: Array<RecipeIngredientRequestDto>;
    /**
     * The recipe instructions
     */
    instructions?: string;
    /**
     * The recipe nutrition
     */
    nutrition?: string;
    /**
     * The recipe notes
     */
    notes?: string;
};

export type RecipeIngredientResponseDto = {
    name: string;
    unit: string;
    amount: number;
};

export type RecipeResponseDto = {
    /**
     * The id of the recipe
     */
    id: string;
    /**
     * Name of the recipe
     */
    name: string;
    /**
     * Description of the recipe
     */
    description?: string;
    /**
     * The recipe source
     */
    source?: string;
    /**
     * The number of servings
     */
    servings?: number;
    /**
     * The recipe duration in minutes
     */
    duration?: number;
    /**
     * The recipe ingredients
     */
    ingredients?: Array<RecipeIngredientResponseDto>;
    /**
     * The recipe instructions
     */
    instructions?: string;
    /**
     * The recipe nutrition
     */
    nutrition?: string;
    /**
     * The recipe notes
     */
    notes?: string;
    /**
     * The image url the recipe image
     */
    imageUrl?: string;
};

export type PaginationSortOrder = 'ASC' | 'DESC';

export type RecipeResponseFlatDto = {
    /**
     * The id of the recipe
     */
    id: string;
    /**
     * Name of the recipe
     */
    name: string;
    /**
     * Description of the recipe
     */
    description?: string;
    /**
     * The recipe source
     */
    source?: string;
    /**
     * The number of servings
     */
    servings?: number;
    /**
     * The recipe duration in minutes
     */
    duration?: number;
    /**
     * The recipe instructions
     */
    instructions?: string;
    /**
     * The recipe nutrition
     */
    nutrition?: string;
    /**
     * The recipe notes
     */
    notes?: string;
    /**
     * The image url the recipe image
     */
    imageUrl?: string;
};

export type RecipePaginatedResponseDto = {
    total: number;
    /**
     * The page number
     */
    page: number;
    /**
     * The page size
     */
    pageSize: number;
    /**
     * The order by attribute
     */
    orderBy?: string;
    /**
     * The sort order
     */
    sortOrder?: PaginationSortOrder;
    content: Array<RecipeResponseFlatDto>;
};

export type IngredientRequestDto = {
    name: string;
};

export type IngredientRequestRecipeDto = {
    id: string;
    name: string;
};

export type IngredientResponseDto = {
    id: string;
    name: string;
    recipes?: Array<IngredientRequestRecipeDto>;
};

export type IngredientPaginatedResponseDto = {
    total: number;
    /**
     * The page number
     */
    page: number;
    /**
     * The page size
     */
    pageSize: number;
    /**
     * The order by attribute
     */
    orderBy?: string;
    /**
     * The sort order
     */
    sortOrder?: PaginationSortOrder;
    content: Array<IngredientResponseDto>;
};

export type AuthRequestDto = {
    /**
     * Username of the user
     */
    username: string;
    /**
     * Password of the user
     */
    password: string;
};

export type AuthResponseDto = {
    /**
     * Access token for the user to authenticate
     */
    accessToken: string;
};

export type AuthRegisterRequestDto = {
    /**
     * Username of the user
     */
    username: string;
    /**
     * Password of the user
     */
    password: string;
};

export type UserResponseDto = {
    /**
     * The id of the user
     */
    id: string;
    /**
     * Username of the user
     */
    username: string;
};

export type CreatePlanMealDto = {
    dayIndex: number;
    recipeId: string;
};

export type CreatePlanDto = {
    name: string;
    days: number;
    meals?: Array<CreatePlanMealDto>;
};

export type PlanResponseMealRecipeDto = {
    /**
     * The id of the recipe
     */
    id: string;
    /**
     * Name of the recipe
     */
    name: string;
    /**
     * Description of the recipe
     */
    description?: string;
    /**
     * The recipe source
     */
    source?: string;
    /**
     * The number of servings
     */
    servings?: number;
    /**
     * The recipe duration in minutes
     */
    duration?: number;
    /**
     * The recipe instructions
     */
    instructions?: string;
    /**
     * The recipe nutrition
     */
    nutrition?: string;
    /**
     * The recipe notes
     */
    notes?: string;
    /**
     * The image url the recipe image
     */
    imageUrl?: string;
};

export type PlanResponseMealDto = {
    id: string;
    dayIndex: number;
    recipe: PlanResponseMealRecipeDto;
};

export type PlanResponseDto = {
    id: string;
    name: string;
    days: number;
    /**
     * The plan meals
     */
    meals?: Array<PlanResponseMealDto>;
};

export type PlanResponseFlatDto = {
    id: string;
    name: string;
    days: number;
};

export type PlanResponsePaginatedSimpleDto = {
    total: number;
    content: Array<PlanResponseFlatDto>;
};

export type PlanRequestMealDto = {
    dayIndex: number;
    recipeId: string;
};

export type PlanRequestDto = {
    name: string;
    days: number;
    meals?: Array<PlanRequestMealDto>;
};

export type ImportType = 'mela';

export type ImportRecipeDto = {
    url: string;
};

export type AddProductRequestType = 'product' | 'recipes';

export type AddProductRequestDto = {
    type: AddProductRequestType;
    name: string;
    unit: string;
    amount: number;
};

export type AddRecipesRequestDto = {
    type: AddProductRequestType;
    recipeIds: Array<string>;
};

export type MessageType = 'updatedByProduct' | 'updatedByRecipe' | 'createdByRecipe' | 'createdByProduct';

export type LogEntryDto = {
    /**
     * The i18n message key
     */
    messageType: MessageType;
    /**
     * The i18n message properties
     */
    messageProperties?: {
        [key: string]: unknown;
    };
};

export type ProductResponseDto = {
    id: string;
    name: string;
    unit: string;
    amount: number;
    log: Array<LogEntryDto>;
};

export type AddProductsResponseDto = {
    products: Array<ProductResponseDto>;
};

export type ProductPaginatedResponseDto = {
    total: number;
    /**
     * The page number
     */
    page: number;
    /**
     * The page size
     */
    pageSize: number;
    /**
     * The order by attribute
     */
    orderBy?: string;
    /**
     * The sort order
     */
    sortOrder?: PaginationSortOrder;
    content: Array<ProductResponseDto>;
};

export type ProductRequestDto = {
    name: string;
    unit: string;
    amount: number;
};

export type ScheduledMealRequestDto = {
    recipeId: string;
    datetime: string;
    done?: boolean;
};

export type CreateScheduledMealsRequestDto = {
    meals: Array<ScheduledMealRequestDto>;
};

export type ScheduledMealResponseDto = {
    id: string;
    datetime: string;
    done?: boolean;
    recipe: RecipeResponseFlatDto;
};

export type CreateScheduledMealsResponseDto = {
    meals: Array<ScheduledMealResponseDto>;
};

export type ScheduledMealResponsePaginatedDto = {
    total: number;
    content: Array<ScheduledMealResponseDto>;
};

export type SyncDataDto = {
    created: Array<{
        [key: string]: unknown;
    }>;
    updated: Array<{
        [key: string]: unknown;
    }>;
    deleted: Array<string>;
};

export type SyncPushRequestDto = {
    recipes: SyncDataDto;
};

export type SyncTablesDto = {
    recipes: SyncDataDto;
};

export type SyncPullResponseDto = {
    changes: SyncTablesDto;
    timestamp: string;
};

export type GetRecipesData = {
    body?: never;
    path?: never;
    query: {
        /**
         * The page number
         */
        page: number;
        /**
         * The page size
         */
        pageSize: number;
        /**
         * The order by attribute
         */
        orderBy?: string;
        /**
         * The sort order
         */
        sortOrder?: PaginationSortOrder;
        /**
         * The filter
         */
        filter?: string;
    };
    url: '/v1/recipes';
};

export type GetRecipesResponses = {
    200: RecipePaginatedResponseDto;
};

export type GetRecipesResponse = GetRecipesResponses[keyof GetRecipesResponses];

export type CreateRecipeData = {
    body: RecipeRequestDto;
    path?: never;
    query?: never;
    url: '/v1/recipes';
};

export type CreateRecipeResponses = {
    /**
     * Recipe successfully created
     */
    201: RecipeResponseDto;
};

export type CreateRecipeResponse = CreateRecipeResponses[keyof CreateRecipeResponses];

export type DeleteRecipeData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/v1/recipes/{id}';
};

export type DeleteRecipeErrors = {
    /**
     * Recipe not found
     */
    404: unknown;
    /**
     * Recipe is in use by a plan
     */
    409: unknown;
};

export type DeleteRecipeResponses = {
    /**
     * Successfully deleted the recipe
     */
    200: unknown;
};

export type GetRecipeData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/v1/recipes/{id}';
};

export type GetRecipeErrors = {
    /**
     * Recipe not found
     */
    404: unknown;
};

export type GetRecipeResponses = {
    /**
     * Successfully retrieved the recipe
     */
    200: RecipeResponseDto;
};

export type GetRecipeResponse = GetRecipeResponses[keyof GetRecipeResponses];

export type UpdateRecipeData = {
    body: RecipeRequestDto;
    path: {
        id: string;
    };
    query?: never;
    url: '/v1/recipes/{id}';
};

export type UpdateRecipeErrors = {
    /**
     * Recipe not found
     */
    404: unknown;
};

export type UpdateRecipeResponses = {
    /**
     * Successfully updated the recipe
     */
    200: RecipeResponseDto;
};

export type UpdateRecipeResponse = UpdateRecipeResponses[keyof UpdateRecipeResponses];

export type DeleteImageData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/v1/recipes/{id}/image';
};

export type DeleteImageErrors = {
    /**
     * No Recipe found to remove the image from
     */
    404: unknown;
};

export type DeleteImageResponses = {
    /**
     * Successfully removed the image
     */
    200: unknown;
};

export type UploadImageData = {
    body: {
        file: Blob | File;
    };
    path: {
        id: string;
    };
    query?: never;
    url: '/v1/recipes/{id}/image';
};

export type UploadImageErrors = {
    /**
     * No Recipe found to add the image to
     */
    404: unknown;
};

export type UploadImageResponses = {
    /**
     * Successfully uploaded the image
     */
    200: RecipeResponseDto;
};

export type UploadImageResponse = UploadImageResponses[keyof UploadImageResponses];

export type UpdateImageData = {
    body: {
        file: Blob | File;
    };
    path: {
        id: string;
    };
    query?: never;
    url: '/v1/recipes/{id}/image';
};

export type UpdateImageErrors = {
    /**
     * No Recipe found to update the image at
     */
    404: unknown;
};

export type UpdateImageResponses = {
    /**
     * Successfully uploaded the image
     */
    200: RecipeResponseDto;
};

export type UpdateImageResponse = UpdateImageResponses[keyof UpdateImageResponses];

export type GetIngredientsData = {
    body?: never;
    path?: never;
    query: {
        /**
         * The page number
         */
        page: number;
        /**
         * The page size
         */
        pageSize: number;
        /**
         * The order by attribute
         */
        orderBy?: string;
        /**
         * The sort order
         */
        sortOrder?: PaginationSortOrder;
        /**
         * The filter
         */
        filter?: string;
    };
    url: '/v1/ingredients';
};

export type GetIngredientsResponses = {
    200: IngredientPaginatedResponseDto;
};

export type GetIngredientsResponse = GetIngredientsResponses[keyof GetIngredientsResponses];

export type CreateIngredientData = {
    body: IngredientRequestDto;
    path?: never;
    query?: never;
    url: '/v1/ingredients';
};

export type CreateIngredientResponses = {
    201: IngredientResponseDto;
};

export type CreateIngredientResponse = CreateIngredientResponses[keyof CreateIngredientResponses];

export type DeleteIngredientsData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/v1/ingredients/{id}';
};

export type DeleteIngredientsErrors = {
    /**
     * Ingredient not found
     */
    404: unknown;
    /**
     * Ingredient is in use
     */
    409: unknown;
};

export type DeleteIngredientsResponses = {
    /**
     * Successfully deleted the ingredient
     */
    200: unknown;
};

export type GetIngredientData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/v1/ingredients/{id}';
};

export type GetIngredientErrors = {
    404: unknown;
};

export type GetIngredientResponses = {
    200: IngredientResponseDto;
};

export type GetIngredientResponse = GetIngredientResponses[keyof GetIngredientResponses];

export type UpdateIngredientsData = {
    body: IngredientRequestDto;
    path: {
        id: string;
    };
    query?: never;
    url: '/v1/ingredients/{id}';
};

export type UpdateIngredientsErrors = {
    404: unknown;
};

export type UpdateIngredientsResponses = {
    200: IngredientResponseDto;
};

export type UpdateIngredientsResponse = UpdateIngredientsResponses[keyof UpdateIngredientsResponses];

export type UserLoginData = {
    body: AuthRequestDto;
    path?: never;
    query?: never;
    url: '/v1/auth/login';
};

export type UserLoginResponses = {
    /**
     * Successfully logged in
     */
    200: AuthResponseDto;
};

export type UserLoginResponse = UserLoginResponses[keyof UserLoginResponses];

export type UserRegisterData = {
    /**
     * Daten zur Erstellung eines neuen Benutzers
     */
    body: AuthRegisterRequestDto;
    path?: never;
    query?: never;
    url: '/v1/auth/register';
};

export type UserRegisterErrors = {
    /**
     * User already exists
     */
    409: unknown;
};

export type UserRegisterResponses = {
    /**
     * User successfully registered
     */
    201: unknown;
};

export type GetProfileData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/v1/auth/profile';
};

export type GetProfileResponses = {
    /**
     * Successfully retrieved the current user
     */
    200: UserResponseDto;
};

export type GetProfileResponse = GetProfileResponses[keyof GetProfileResponses];

export type GetPlansData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/v1/plans';
};

export type GetPlansResponses = {
    200: PlanResponsePaginatedSimpleDto;
};

export type GetPlansResponse = GetPlansResponses[keyof GetPlansResponses];

export type CreatePlanData = {
    body: CreatePlanDto;
    path?: never;
    query?: never;
    url: '/v1/plans';
};

export type CreatePlanResponses = {
    201: PlanResponseDto;
};

export type CreatePlanResponse = CreatePlanResponses[keyof CreatePlanResponses];

export type RemovePlanData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/v1/plans/{id}';
};

export type RemovePlanErrors = {
    404: unknown;
};

export type RemovePlanResponses = {
    200: unknown;
};

export type GetPlanData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/v1/plans/{id}';
};

export type GetPlanErrors = {
    404: unknown;
};

export type GetPlanResponses = {
    200: PlanResponseDto;
};

export type GetPlanResponse = GetPlanResponses[keyof GetPlanResponses];

export type UpdatePlanData = {
    body: PlanRequestDto;
    path: {
        id: string;
    };
    query?: never;
    url: '/v1/plans/{id}';
};

export type UpdatePlanErrors = {
    404: unknown;
};

export type UpdatePlanResponses = {
    200: PlanResponseDto;
};

export type UpdatePlanResponse = UpdatePlanResponses[keyof UpdatePlanResponses];

export type ImportBackupData = {
    body: {
        file: Blob | File;
    };
    path?: never;
    query: {
        type: ImportType;
    };
    url: '/v1/data/import/recipes';
};

export type ImportBackupResponses = {
    200: unknown;
};

export type ScrapRecipeData = {
    body: ImportRecipeDto;
    path?: never;
    query?: never;
    url: '/v1/data/scrap/recipe';
};

export type ScrapRecipeErrors = {
    406: unknown;
};

export type ScrapRecipeResponses = {
    200: RecipeResponseDto;
};

export type ScrapRecipeResponse = ScrapRecipeResponses[keyof ScrapRecipeResponses];

export type GetProductsData = {
    body?: never;
    path?: never;
    query: {
        /**
         * The page number
         */
        page: number;
        /**
         * The page size
         */
        pageSize: number;
        /**
         * The order by attribute
         */
        orderBy?: string;
        /**
         * The sort order
         */
        sortOrder?: PaginationSortOrder;
        /**
         * The filter
         */
        filter?: string;
    };
    url: '/v1/products';
};

export type GetProductsResponses = {
    200: ProductPaginatedResponseDto;
};

export type GetProductsResponse = GetProductsResponses[keyof GetProductsResponses];

export type CreateProductData = {
    body: AddProductRequestDto | AddRecipesRequestDto;
    path?: never;
    query?: never;
    url: '/v1/products';
};

export type CreateProductResponses = {
    /**
     * Product successfully created
     */
    201: AddProductsResponseDto;
};

export type CreateProductResponse = CreateProductResponses[keyof CreateProductResponses];

export type DeleteProductData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/v1/products/{id}';
};

export type DeleteProductErrors = {
    404: unknown;
};

export type DeleteProductResponses = {
    200: unknown;
};

export type GetProductData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/v1/products/{id}';
};

export type GetProductErrors = {
    404: unknown;
};

export type GetProductResponses = {
    200: ProductResponseDto;
};

export type GetProductResponse = GetProductResponses[keyof GetProductResponses];

export type UpdateProductData = {
    body: ProductRequestDto;
    path: {
        id: string;
    };
    query?: never;
    url: '/v1/products/{id}';
};

export type UpdateProductErrors = {
    404: unknown;
};

export type UpdateProductResponses = {
    200: ProductResponseDto;
};

export type UpdateProductResponse = UpdateProductResponses[keyof UpdateProductResponses];

export type GetScheduledMealsData = {
    body?: never;
    path?: never;
    query: {
        from: string;
        to: string;
    };
    url: '/v1/scheduled-meals';
};

export type GetScheduledMealsResponses = {
    200: ScheduledMealResponsePaginatedDto;
};

export type GetScheduledMealsResponse = GetScheduledMealsResponses[keyof GetScheduledMealsResponses];

export type CreateScheduledMealData = {
    body: CreateScheduledMealsRequestDto;
    path?: never;
    query?: never;
    url: '/v1/scheduled-meals';
};

export type CreateScheduledMealResponses = {
    201: CreateScheduledMealsResponseDto;
};

export type CreateScheduledMealResponse = CreateScheduledMealResponses[keyof CreateScheduledMealResponses];

export type DeleteScheduledMealData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/v1/scheduled-meals/{id}';
};

export type DeleteScheduledMealErrors = {
    404: unknown;
};

export type DeleteScheduledMealResponses = {
    200: unknown;
};

export type GetScheduledMealData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/v1/scheduled-meals/{id}';
};

export type GetScheduledMealErrors = {
    404: unknown;
};

export type GetScheduledMealResponses = {
    200: ScheduledMealResponseDto;
};

export type GetScheduledMealResponse = GetScheduledMealResponses[keyof GetScheduledMealResponses];

export type UpdateScheduledMealData = {
    body: ScheduledMealRequestDto;
    path: {
        id: string;
    };
    query?: never;
    url: '/v1/scheduled-meals/{id}';
};

export type UpdateScheduledMealErrors = {
    404: unknown;
};

export type UpdateScheduledMealResponses = {
    200: ScheduledMealResponseDto;
};

export type UpdateScheduledMealResponse = UpdateScheduledMealResponses[keyof UpdateScheduledMealResponses];

export type SyncPullData = {
    body?: never;
    path?: never;
    query: {
        last_pulled_at?: number;
        schema_version: number;
        migration: string;
    };
    url: '/v1/sync';
};

export type SyncPullErrors = {
    /**
     * Recipe not found
     */
    404: unknown;
};

export type SyncPullResponses = {
    200: SyncPullResponseDto;
};

export type SyncPullResponse = SyncPullResponses[keyof SyncPullResponses];

export type SyncPushData = {
    body: SyncPushRequestDto;
    path?: never;
    query: {
        last_pulled_at: number;
    };
    url: '/v1/sync';
};

export type SyncPushResponses = {
    200: unknown;
};

export type ClientOptions = {
    baseURL: string;
};