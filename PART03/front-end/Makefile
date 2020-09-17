.PHONY: all build push

all: build push

build:
	yarn run build

push:
	# replace s3://photos.castlerock.ai with the name of your bucket.
	aws s3 cp build s3://photos.castlerock.ai --recursive --acl public-read
