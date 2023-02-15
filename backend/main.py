import os

import strawberry
import uvicorn
from fastapi import FastAPI, Depends
from starlette.middleware.cors import CORSMiddleware

from strawberry.fastapi import GraphQLRouter

from supertokens_python import init, InputAppInfo, SupertokensConfig, get_all_cors_headers
from supertokens_python.framework.fastapi import get_middleware
from supertokens_python.recipe import emailpassword, session
from supertokens_python.recipe.session.framework.fastapi import verify_session

from gql import Query, Mutation


init(
    app_info=InputAppInfo(
        app_name="example",
        api_domain=f"http://{os.getenv('HOSTNAME')}:8000",
        website_domain=f"http://{os.getenv('HOSTNAME')}:3000",
        api_base_path="/auth",
        website_base_path="/auth"
    ),
    supertokens_config=SupertokensConfig(
        connection_uri="http://supertokens:3567",
    ),
    framework='fastapi',
    recipe_list=[
        session.init(),
        emailpassword.init(),
    ],
    mode='wsgi'
)


app = FastAPI()
app.add_middleware(get_middleware())
app.add_middleware(
            CORSMiddleware,
            allow_origins=[f"http://{os.getenv('HOSTNAME')}:3000"],
            allow_credentials=True,
            allow_methods=["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
            allow_headers=["Content-Type"] + get_all_cors_headers(),
        )

schema = strawberry.Schema(query=Query, mutation=Mutation)
app.include_router(
        GraphQLRouter(schema),
        prefix="/graphql",
        dependencies=[Depends(verify_session())]
)

if __name__ == "__main__":
    reload = os.getenv("PROD") != "1"
    uvicorn.run("main:app", host="0.0.0.0", reload=reload)
